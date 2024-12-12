import { Octokit } from 'octokit';
import { cache } from 'react';
import styles from './page.module.css';
import { getRoundData } from '../../../api';

export const revalidate = 60; // revalidate this page every 60 seconds

const GITHUB_BASE = 'https://github.com/tgstation/TerraGov-Marine-Corps/pull/';
const githubToken = process.env.GITHUB_TOKEN || '';

const octokit = new Octokit({
  auth: githubToken,
});

const getGithubPRDetails = cache(async (pr: number) => {
  const json = await octokit.rest.pulls.get({
    owner: 'tgstation',
    repo: 'TerraGov-Marine-Corps',
    pull_number: pr,
  });

  const reactions = await octokit.rest.reactions.listForIssue({
    owner: 'tgstation',
    repo: 'TerraGov-Marine-Corps',
    issue_number: pr,
  });

  const reviews = await octokit.rest.pulls.listReviews({
    owner: 'tgstation',
    repo: 'TerraGov-Marine-Corps',
    pull_number: pr,
  });

  const reviewComments = await octokit.paginate(
    octokit.rest.pulls.listReviewComments,
    {
      owner: 'tgstation',
      repo: 'TerraGov-Marine-Corps',
      pull_number: pr,
      per_page: 100,
    }
  );

  const comments = await octokit.paginate(octokit.rest.issues.listComments, {
    owner: 'tgstation',
    repo: 'TerraGov-Marine-Corps',
    issue_number: pr,
    per_page: 100,
  });

  return {
    ...json.data,
    reactions: reactions.data,
    allComments: comments,
    allReviews: reviews.data,
    allReviewComments: reviewComments,
  };
});

export default async function Deaths({ params: { roundId } }: any) {
  if (!githubToken) {
    return (
      <blockquote className={styles.missingToken}>
        <kbd>GITHUB_TOKEN</kbd> not found. Test merge information not available.
      </blockquote>
    );
  }

  const { testmerged_prs } = await getRoundData(roundId);

  const rows = await Promise.all(
    Object.values(testmerged_prs).map(async (pr: any, index) => {
      const pullRequestUrl = `${GITHUB_BASE}/${pr.number}`;
      const { labels, reactions, allComments, allReviewComments } =
        await getGithubPRDetails(pr.number);
      const totalReactions = {
        thumbs_up: 0,
        thumbs_down: 0,
      };
      reactions.forEach((reaction: any) => {
        if (reaction.content === '+1') {
          totalReactions.thumbs_up++;
        }
        if (reaction.content === '-1') {
          totalReactions.thumbs_down++;
        }
      });
      allComments.forEach((comment: any) => {
        totalReactions.thumbs_up += comment.reactions?.['+1'] ?? 0;
        totalReactions.thumbs_down += comment.reactions?.['-1'] ?? 0;
      });
      return (
        <tr key={index}>
          <td>
            <a href={pullRequestUrl}>{pr.number}</a>
          </td>
          <td>
            <a href={pullRequestUrl}>
              👍x{totalReactions.thumbs_up} 👎x{totalReactions.thumbs_down}
              <br />
              💬
              {1 +
                allComments.length +
                // allReviews.length +
                allReviewComments.length}{' '}
              comments.
              {/* 📋 {allReviews.length + allReviewComments.length} */}
              {/* 📝 {allReviewComments.length} */}
            </a>
          </td>
          <td>
            <a href={pullRequestUrl}>{pr.title}</a>
          </td>
          <td>
            <a href={pullRequestUrl}>{pr.author}</a>
          </td>
          <td>
            <a href={pullRequestUrl}>
              <ul>
                {labels.map((label: any, index: any) => (
                  <li key={index}>
                    <span title={label.description ?? ''}>{label.name}</span>
                  </li>
                ))}
              </ul>
            </a>
          </td>
        </tr>
      );
    })
  );
  return (
    <>
      <table className={styles.death}>
        <thead>
          <tr>
            <th>Number</th>
            <th>Reactions</th>
            <th>Title</th>
            <th>Author</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </>
  );
}

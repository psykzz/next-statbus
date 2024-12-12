
export async function getStatbusData() {
    const summary = await(
      await fetch('https://statbus.psykzz.com/api/summary', {
        next: { revalidate: 60 },
      })
    ).json();
  
    // Remove this - do it later in the component itself.
    const rounds = await Promise.all(
      summary.rounds.map(async (roundId: number) => {
        return roundId;
      })
    );
    
    return { summary, rounds };
  }
  
  export async function getRoundData(roundId: number) {
    const res = await fetch(`https://statbus.psykzz.com/api/round/${roundId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return {};
    }
    const data = await res.json();
    return data?.round ?? {};
  }
  
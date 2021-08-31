import Layout from "../../components/layout";
import Header from "../../components/header";
import { getLeaderboard } from "../../lib/crud";

export default function Leaderboard({ leaderboard }) {
  let content = <></>;

  const bodyStyle = "p-2 text-gray-700 text-center border-r rounded-lg border-b border-gray-400"
  const headerStyle = "p-2 border-r border-b border-gray-400"
  if (leaderboard.length > 0) {
    content = <table className="inline-block rounded-lg border border-gray-400 
      justify-items-center shadow-md text-center text-2xl">
      <thead >
        <tr>
          <th className={headerStyle}> Rank  </th>
          <th className={headerStyle}> Name  </th>
          <th className={headerStyle}>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {leaderboard.map((user, i) => (
          <tr key={user._id}>
            <td className={bodyStyle + " text-sm"}>{i + 1}</td>
            <td className={bodyStyle}>{user.user}</td>
            <td className={bodyStyle}>{user.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  } else {
    content = <div className="text-center">
      No one played yet :(
    </div>
  }

  return <Layout>
    <Header />
    <div className="mt-8 flex justify-center">{content}</div>
  </Layout>
}

export async function getStaticProps() {
  const leaderboard = await getLeaderboard(15);
  return { props: { leaderboard }, revalidate: 10 };
}

import {
  useUnicafeAll,
  useUnicafeAverage,
  useUnicafeBad,
  useUnicafeGood,
  useUnicafeNeutral,
  useUnicafePositive,
} from "../unicafe";

const Statistics = () => {
  const good = useUnicafeGood();
  const neutral = useUnicafeNeutral();
  const bad = useUnicafeBad();
  const all = useUnicafeAll();
  const average = useUnicafeAverage();
  const positive = useUnicafePositive();

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;

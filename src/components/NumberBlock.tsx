import { useEffect } from "react";

const NumberBlock = ({ num }: { num: number }) => {
  console.log(`this components`);
  useEffect(() => {
    console.log(`this components is rendered`);
  }, []);
  return <div>{`${num} is displayed`}</div>;
};

export default NumberBlock;

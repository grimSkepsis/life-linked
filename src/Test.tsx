import { ReactElement } from "react";

const Test = (props: { test: string }): ReactElement => {
  return (
    <div className="w-full text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
      test me {props.test}
    </div>
  );
};

export default Test;

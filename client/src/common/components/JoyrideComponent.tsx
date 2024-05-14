import Joyride, { CallBackProps, STATUS } from "react-joyride";

const JoyrideComponent = ({
  run,
  steps,
  setState,
}: {
  run: boolean;
  steps: any;
  setState: any;
}) => {
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState((prev: any) => ({ ...prev, run: false }));
    }
  };

  return (
    <Joyride
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      showSkipButton
      continuous
      styles={{
        options: {
          arrowColor: "#031C28",
          backgroundColor: "#163748",
          primaryColor: "#69F2FA",
          textColor: "white",

          beaconSize: 20,
          zIndex: 1000,
        },
      }}
    />
  );
};

export default JoyrideComponent;

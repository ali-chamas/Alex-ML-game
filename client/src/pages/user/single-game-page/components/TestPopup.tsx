import { labelType, modelType } from "../../../../tools/data-types/modelType";
import { useContext, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { sendRequest } from "../../../../tools/request-method/request";
import toast, { Toaster } from "react-hot-toast";
import {
  DarkModeContext,
  DarkModeContextType,
} from "../../../../context/DarkModeContext";

const TestPopup = ({
  gameId,

  model,
  setTrigger,
}: {
  gameId: string;

  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  model: modelType;
}) => {
  interface testResponseType {
    example: string;
    result: {};
  }

  const { isDarkMode } = useContext(DarkModeContext) as DarkModeContextType;

  const [trained, setTrained] = useState<boolean>(model.isTrained);
  const [example, setExample] = useState("");
  const [testResponse, setTestResponse] = useState<testResponseType | null>(
    null
  );
  const [testResults, setTestResults] = useState<[] | any>([]);
  const [trainingdataTracking, setTrainingDataTracking] = useState<
    [labelType] | []
  >(
    (JSON.parse(window.localStorage.getItem("oldData") as string) as [
      labelType
    ]) ?? []
  );

  const [loading, setLoading] = useState<boolean>(false);

  const trainModel = async () => {
    setLoading(true);
    try {
      const res = await sendRequest("POST", "/user/train_model", {
        gameId: gameId,
      });

      setTrainingDataTracking(model.dataset.labels);
      window.localStorage.setItem(
        "oldData",
        JSON.stringify(model.dataset.labels)
      );

      setTrained(true);
      setTrigger((t) => !t);
      toast.success("trained succesfully", {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {
        className: "dark:bg-blue-gray-900 dark:text-white",
      });
    }
    setLoading(false);
  };

  const testModel = async () => {
    if (example) {
      try {
        const res = await sendRequest("POST", "/user/test_model", {
          modelUrl: model.modelUrl,
          example: example,
        });

        setTestResponse(res.data);
        setTestResults(Object.entries(res.data.result));
        setExample("");
        setTrigger((t) => !t);
      } catch (error) {
        console.log(error);
      }
    }
  };

  console.log(model.modelUrl);

  const areLabelsChanged = (): boolean => {
    const oldData = model.dataset.labels;

    if (oldData.length !== trainingdataTracking.length) {
      return false;
    }

    for (let i = 0; i < oldData.length; i++) {
      const oldLabel = oldData[i];
      const newLabel = trainingdataTracking[i];

      if (JSON.stringify(oldLabel) !== JSON.stringify(newLabel)) {
        return false;
      }
    }

    return true;
  };
  return (
    <>
      <Toaster />

      <div className="flex h-full w-full justify-center items-center">
        {!trained ? (
          <div className="flex flex-col gap-3 mt-[30%] items-center">
            <button className="btn-primary-white" onClick={trainModel}>
              Train Model
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2 items-center">
              <Input
                label="example"
                value={example}
                type="text"
                color={isDarkMode ? "white" : "black"}
                onChange={(e) => setExample(e.target.value)}
              />
              <button className="btn-primary-white text-sm" onClick={testModel}>
                Test
              </button>
            </div>
            <div className="dark:bg-black/25 bg-white/40 rounded-md w-[200px] h-[150px] p-2 text-sm sm:w-[300px] sm:h-[200px] md:text-base lg:w-[400px] overflow-y-auto">
              {testResponse && (
                <div className="flex flex-col gap-2">
                  <h1>{testResponse.example}:</h1>
                  {testResults.map(
                    ([key, value]: [key: string, value: number]) => {
                      const percentage = (value * 100).toFixed(2);
                      return (
                        <p key={key}>
                          {key}: {percentage}%
                        </p>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            <Button
              className="btn-primary-white text-sm disabled-btn font-normal lowercase"
              disabled={areLabelsChanged()}
              onClick={trainModel}
              loading={loading}
            >
              Train Again
            </Button>
            {areLabelsChanged() && <small>make changes first</small>}
          </div>
        )}
      </div>
    </>
  );
};

export default TestPopup;

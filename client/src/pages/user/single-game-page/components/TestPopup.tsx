import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { modelType } from "../../../../tools/data-types/modelType";
import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { sendRequest } from "../../../../tools/request-method/request";

const TestPopup = ({
  gameId,
  open,
  setOpen,
  model,
  setTrigger,
}: {
  gameId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  model: modelType;
}) => {
  interface testResponseType {
    example: string;
    result: {};
  }

  const [trained, setTrained] = useState<boolean>(model.isTrained);
  const [example, setExample] = useState("");
  const [testResponse, setTestResponse] = useState<testResponseType | null>(
    null
  );
  const [testResults, setTestResults] = useState<[] | any>([]);

  const trainModel = async () => {
    try {
      const res = await sendRequest("POST", "/user/train_model", {
        gameId: gameId,
      });
      console.log(res);
      setTrained(true);
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  const testModel = async () => {
    try {
      const res = await sendRequest("POST", "/user/test_model", {
        modelUrl: model.modelUrl,
        example: example,
      });
      console.log(res);
      setTestResponse(res.data);
      setTestResults(Object.entries(res.data.result));
      setExample("");
      setTrigger((t) => !t);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="popup ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="popup-child flex flex-col gap-5 "
      >
        <div className="flex justify-between items-center w-full">
          <h1 className=" text-lg ">Train then test your model!</h1>

          <button onClick={() => setOpen(false)} className="text-xl ">
            <IoMdClose />
          </button>
        </div>

        <div className="flex h-full w-full justify-center items-center">
          {!trained ? (
            <button className="btn-primary-white" onClick={trainModel}>
              Train model
            </button>
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Input
                  label="example"
                  value={example}
                  type="text"
                  color="white"
                  onChange={(e) => setExample(e.target.value)}
                />
                <button
                  className="btn-primary-white text-sm"
                  onClick={testModel}
                >
                  Test
                </button>
              </div>
              <div className="bg-black/25 rounded-md w-[200px] h-[150px] p-2 text-sm sm:w-[300px] sm:h-[200px] md:text-base lg:w-[400px] ">
                {testResponse && (
                  <div className="flex flex-col gap-2">
                    <h1>{testResponse.example}:</h1>
                    {testResults.map(
                      ([key, value]: [key: string, value: number]) => {
                        const percentage = (value * 100).toFixed(2);
                        return (
                          <div key={key}>
                            {key}: {percentage}%
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
              <button
                className="btn-primary-white text-sm"
                onClick={trainModel}
              >
                Train again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TestPopup;

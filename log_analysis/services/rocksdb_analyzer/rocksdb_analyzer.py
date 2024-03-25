from modules.pipelines.pipeline import Pipeline
from modules.pipelines.pipes.preprocessing import Strip, SplitBySpace
from services.rocksdb_analyzer.pipes import RemoveByRegex, RemoveOriginalLogTime, RemoveSourceCode, StopRunningIfContains

def main():
    pipeline = Pipeline("prepare")
    pipeline.add(StopRunningIfContains(["EVENT_LOG_v1", "DB Stats", "DUMPING STATS"]))
    pipeline.add(RemoveOriginalLogTime())
    pipeline.add(RemoveSourceCode())
    pipeline.add(RemoveByRegex("remove_insignificant_tokens", "\[[A-Za-z]+\]|\[[A-Za-z]-\d+\]|\[JOB \d+\]"))
    pipeline.add(Strip())

    with open("rocksdb_logs.txt", "r") as input:
        with open("filtered_rocksdb_logs.txt", "w") as output:
            for line in input.readlines():
                result = pipeline.run(line)

                if result is not None:
                    output.write(result + "\n")

if __name__ == "__main__":
    main()

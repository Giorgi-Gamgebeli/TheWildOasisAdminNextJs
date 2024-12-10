"use client";

import Heading from "../../_components/Heading";
import Row from "../../_components/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../_components/Spinner";
import TodayItem from "./TodayItem";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="col-span-2 col-start-1 flex flex-col gap-[2.4rem] rounded-[7px] border border-gray-100 bg-white px-[3.2rem] pb-[3.2rem] pt-[2.4rem] dark:border-gray-800 dark:bg-gray-0">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="overflow-scroll overflow-x-hidden"
          >
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="mt-[0.8rem] text-center text-[1.8rem] font-medium">
            No activity today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;

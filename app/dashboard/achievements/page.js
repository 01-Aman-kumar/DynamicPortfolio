"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import AchievementForm from "@/components/forms/AchievementForm";
import AchievementCard from "@/components/dashboard/AchievementCard";

export default function AchievementsPage() {
  const [data, setData] = useState([]);

  const fetchAchievements = async () => {
    const res = await API.get("/achievements");
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-5">Achievements</h2>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        {data.map((item) => (
          <AchievementCard
            key={item._id}
            item={item}
            onDelete={fetchAchievements}
          />
        ))}
      </div>
      <AchievementForm onSuccess={fetchAchievements} />
    </div>
  );
}
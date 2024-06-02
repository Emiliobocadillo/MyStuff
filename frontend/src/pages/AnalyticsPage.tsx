// src/pages/AnalyticsPage.tsx
import React, { useEffect, useState } from "react";
import { useItemsActions } from "../hooks/useItemsActions";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "../styles/AnalyticsPage.module.css";

// Register the necessary chart components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsPage: React.FC = () => {
  const { fetchAnalytics } = useItemsActions();
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalytics();
        // Sort itemsByCategory by count in descending order
        data.itemsByCategory.sort((a: any, b: any) => b.count - a.count);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };

    getAnalyticsData();
  }, [fetchAnalytics]);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  const itemsByCategoryData = {
    labels: analyticsData.itemsByCategory.map((item: any) => item.label),
    datasets: [
      {
        label: "Items by Category",
        data: analyticsData.itemsByCategory.map((item: any) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.analyticsContainer}>
      <h1>Analytics</h1>

      <div className={styles.chartContainer}>
        <Bar
          data={itemsByCategoryData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Items by Category",
              },
            },
          }}
        />
      </div>
      <div className={styles.valuesContainer}>
        <div className={styles.valueItem}>
          <h2>Total Number of Items:</h2>
          <p className={styles.value}>{analyticsData.totalItems}</p>
        </div>
        <div className={styles.valueItem}>
          <h2>Total Value of Items:</h2>
          <p className={styles.value}>{analyticsData.totalValue}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

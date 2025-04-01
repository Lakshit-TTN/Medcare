"use client";
import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { useRouter } from "next/navigation";
import Toast from "@/components/toast/Toast";

const Dashboard = () => {
  const router = useRouter();
  const [totalDoctors, setTotalDoctors] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type });
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const fetchCounts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        showToast("You must be logged in to add a doctor.", "error");
        return;
      }

      try {
        const doctorsRes = await fetch("http://localhost:5000/api/admin/doctors/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (doctorsRes.status === 403 || doctorsRes.status === 401) {
          showToast("You must be logged in to add a doctor.", "error");
          setTimeout(() => {
            router.push('/')
          }, 2000);
        }
        const doctorsData = await doctorsRes.json();
        setTotalDoctors(doctorsData.count);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [hydrated]);

  return hydrated ? (
    <div className={styles.container}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h2 className={styles.header}>Admin Dashboard</h2>

      <div className={styles.totalDoctors}>
        <h3>Total Doctors: {totalDoctors !== null ? totalDoctors : "Loading..."}</h3>
      </div>


      <div className={styles.grid}>
        <div className={styles.card} onClick={() => router.push("/addDoctor")}>
          <h3>Add Doctor</h3>
          <p>Add a new doctor to the system</p>
          <button>Add</button>
        </div>

        <div className={styles.card} onClick={() => router.push("/updateDoctor")}>
          <h3>Edit/Delete Doctor</h3>
          <p>Modify or remove doctor records</p>
          <button>Manage</button>
        </div>

        <div className={styles.card} onClick={() => router.push("/appointments")}>
          <h3>Appointments Requests</h3>
          <p>Approve or Reject appointments</p>
          <button>View</button>
        </div>

        <div className={styles.card} onClick={() => router.push("/totalAppointments")}>
          <h3>Total AppointmentS</h3>
          <p>See all appointments here</p>
          <button>View</button>
        </div>
      </div>
    </div>
  ) : <div>Loading...</div>;
};

export default Dashboard;

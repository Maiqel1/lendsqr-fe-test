import { useState } from "react";
import styles from "./UserFilter.module.scss";

interface FilterData {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

interface UserFilterProps {
  isVisible: boolean;
  onFilter: (data: FilterData) => void;
  onReset: () => void;
}

export const UserFilter = ({
  isVisible,
  onFilter,
  onReset,
}: UserFilterProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(filterData);
  };

  const handleReset = () => {
    setFilterData({
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.filterForm}>
      <div className={styles.formGroup}>
        <label>Organization</label>
        <select
          value={filterData.organization}
          onChange={(e) =>
            setFilterData({ ...filterData, organization: e.target.value })
          }
        >
          <option value=''>Select</option>
          <option value='Lendsqr'>Lendsqr</option>
          <option value='Lendstar'>Lendstar</option>
          <option value='Irorun'>Irorun</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Username</label>
        <input
          type='text'
          placeholder='User'
          value={filterData.username}
          onChange={(e) =>
            setFilterData({ ...filterData, username: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type='email'
          placeholder='Email'
          value={filterData.email}
          onChange={(e) =>
            setFilterData({ ...filterData, email: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Date</label>
        <input
          type='date'
          value={filterData.date}
          onChange={(e) =>
            setFilterData({ ...filterData, date: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Phone Number</label>
        <input
          type='tel'
          placeholder='Phone Number'
          value={filterData.phoneNumber}
          onChange={(e) =>
            setFilterData({ ...filterData, phoneNumber: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Status</label>
        <select
          value={filterData.status}
          onChange={(e) =>
            setFilterData({ ...filterData, status: e.target.value })
          }
        >
          <option value=''>Select</option>
          <option value='Active'>Active</option>
          <option value='Inactive'>Inactive</option>
          <option value='Blacklisted'>Blacklisted</option>
          <option value='Pending'>Pending</option>
        </select>
      </div>

      <div className={styles.buttonGroup}>
        <button type='button' onClick={handleReset} className={styles.resetBtn}>
          Reset
        </button>
        <button type='submit' className={styles.filterBtn}>
          Filter
        </button>
      </div>
    </form>
  );
};

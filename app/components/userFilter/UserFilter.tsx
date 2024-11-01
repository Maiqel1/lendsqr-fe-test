import { useState } from "react";
import styles from "@/styles/UserFilter.module.scss";

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
        <label htmlFor='organization'>Organization</label>
        <select
          id='organization'
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

        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          placeholder='User'
          value={filterData.username}
          onChange={(e) =>
            setFilterData({ ...filterData, username: e.target.value })
          }
        />

        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email'
          value={filterData.email}
          onChange={(e) =>
            setFilterData({ ...filterData, email: e.target.value })
          }
        />

        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          value={filterData.date}
          onChange={(e) =>
            setFilterData({ ...filterData, date: e.target.value })
          }
        />

        <label htmlFor='phoneNumber'>Phone Number</label>
        <input
          id='phoneNumber'
          type='tel'
          placeholder='Phone Number'
          value={filterData.phoneNumber}
          onChange={(e) =>
            setFilterData({ ...filterData, phoneNumber: e.target.value })
          }
        />

        <label htmlFor='status'>Status</label>
        <select
          id='status'
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

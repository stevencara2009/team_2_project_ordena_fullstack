import { useState } from 'react'
import styles from './UserItem.module.css'


export const UserItem = ({ users, onSelectUser }) => {

  const [selectedUser, setSelectedUser] = useState(null)

  return (
    <>
      {users.map((user) => (
        <div className={`${styles.userItem} ${selectedUser === user.id ? styles.userOrange : styles.userDark}`} key={user.id || user._id} onClick={() => {
          setSelectedUser(user.id)
          onSelectUser(user)
        }}>
          <h4 className={styles.userItemTitle}>{`${user.name} ${user.lastname}`}</h4>
          <p className={styles.userItemName}>{user.role}</p>
        </div>
      ))}
    </>
  )
}
import styles from './UserItem.module.css'


export const UserItem = ({users}) => {

  return (
    <>
      {users.map((user) => (
        <div className={styles.userItem} key={user.id}>
          <h4 className={styles.userItemTitle}>{`${user.name} ${user.lastname}`}</h4>
          <p className={styles.userItemName}>{user.role}</p>
        </div>
      ))}
    </>
  )
}
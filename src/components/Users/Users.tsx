
import { UserType } from "../../types/types";
import Paginator from "./Paginator.tsx";
import User from "./User";

type PropsType = {
  totalUsersCount: number, 
  pageSize: number, 
  currentPage:  number, 
  onPageChanged: (p: number) => void, 
  users: Array<UserType>,
  followingInProgress: Array<number>,
  follow: (userID: number) => void,
  unfollow: (userID: number) => void

}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, 
  onPageChanged, users, ...props }) => {

  return <div>
    <Paginator currentPage={currentPage}
      onPageChanged={onPageChanged}
      totaItemsCount={totalUsersCount}
      pageSize={pageSize} />

    {
      users.map(u => <User key={u.id}
        user={u} followingInProgress={props.followingInProgress}
        follow={props.follow} unfollow={props.unfollow} />
      )
    }
  </div>
}

export default Users

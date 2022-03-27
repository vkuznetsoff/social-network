
import Paginator from "./Paginator";
import User from "./User";


const Users = (props) => {

  return <div>
    <Paginator currentPage={props.currentPage}
      onPageChanged={props.onPageChanged}
      totaItemsCount={props.totalUsersCount}
      pageSize={props.pageSize} />

    {
      props.users.map(u => <User key={u.id}
        user={u} followingInProgress={props.followingInProgress}
        follow={props.follow} unfollow={props.unfollow} />
      )
    }
  </div>
}

export default Users

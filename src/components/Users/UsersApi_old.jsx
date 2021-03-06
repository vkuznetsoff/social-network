
import React from "react";
import axios from "axios"
import Users from "./Users";


class UsersApiComponent extends React.Component {

  // constructor(props) {
  //   super(props);
  // } by default

  componentDidMount() {
    
    axios.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(response => {
          
      this.props.setUsers(response.data.items)
      this.props.setTotalUsersCount(response.data.totalCount)
      
      
    })
    
  }

onPageChanged = (page) => {

this.props.setCurrentPage(page);
  
  axios.get(
    `https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
    .then(response => {

    this.props.setUsers(response.data.items);
    this.props.setTotalUsersCount(response.data.totalCount)
  })
}

  render(props) {
    
    return <Users totalUsersCount={this.props.totalUsersCount} 
    pageSize={this.props.pageSize}
    currentPage={this.props.currentPage}
    onPageChanged={this.onPageChanged}
    users={this.props.users}
    follow={this.props.follow}
    unfollow={this.props.unfollow}    
    
     />
  }
}
export default UsersApiComponent

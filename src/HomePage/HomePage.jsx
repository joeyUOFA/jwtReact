import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";
import config from 'config';
import { success, failure } from '../_actions/user.actions';

class HomePage extends React.Component {

    async componentDidMount() {
        try {
            const userDetail = await axios.get(`${config.apiUrl}/api/user`);
            this.props.success(userDetail.data);
        }catch(error) {
            this.props.failure(error);
        }
    }

    callCreateCREWSBean = async () => {
        try {
            const crewsBean = await axios.post(`${config.apiUrl}/api/crews`, JSON.stringify({ accountNumber : 1234, customerName : "testPost",  brr : "8M", modifiedDate : new Date()}));
            console.log(crewsBean);
        }catch (error) {
            console.log(error);
        }
        
    }

    callGetCREWSList = async () => {
        try {
            const crewsList = await axios.get(`${config.apiUrl}/api/crews/32`);
            console.log(crewsList);
        }catch (error) {
            console.log(error);
        }
        
    }

    callUpdateCREWSBean = async () => {
        try {
            const crewsBean = await axios.put(`${config.apiUrl}/api/crews/17`, JSON.stringify({ accountNumber : 98765, customerName : "testPost",  brr : "8M", modifiedDate : new Date()}));
            console.log(crewsBean);
        }catch (error) {
            console.log(error);
        } 
    }

    callDeleteCREWSList = async () => {
        try {
            const crewsBean = await axios.delete(`${config.apiUrl}/api/crews/9`);
            console.log(crewsBean);
        }catch (error) {
            console.log(error);
        }
        
    }

    render() {
        const { user } = this.props;
        return (
            user == null? <div></div> : 
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstname}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {user.firstname + ' ' + user.lastname}
                <button onClick = {this.callCreateCREWSBean}>call create CREWSBean</button>
                <button onClick = {this.callGetCREWSList}>call get CREWS List service</button>
                <button onClick = {this.callUpdateCREWSBean}>call update CREWS bean service</button>
                <button onClick = {this.callDeleteCREWSList}>call delete CREWS bean service</button>
                <p>
                    <Link to="/login">Logout</Link>
                </p>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const mapDispatchToProps = {
    success, 
    failure
}

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };
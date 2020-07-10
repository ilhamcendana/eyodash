import React, { useEffect } from 'react';
import SideBarLeft from './components/SideBarLeft';
import { Box, useToast } from '@chakra-ui/core';
import TodoBar from './components/TodoBar';
import Axios from 'axios';
import { connect } from 'react-redux';



const ContainerCMS = ({ children, restApi, dataSet, adminData }) => {
    const Toast = useToast();
    useEffect(() => {
        FetchCmsData();
    }, [])

    //Modify your API url in "reducers -> Store.js" then uncomment all the command below ;)

    const FetchCmsData = () => {

        // Axios.get(`${restApi}`)
        //     .then(res => {
        //         dataSet(res.data.Systems, res.data.Works);
        //     })
        //     .catch(err => {
        //         Toast({
        //             title: 'Error',
        //             description: err.message,
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //         })
        //     })
    }

    const sentTodo = (values, cb) => {
        //remove this cb below if you using the actual rest api
        Toast({
            title: 'Success',
            description: 'Todo Added',
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        cb()


        // Axios({
        //     method: 'post',
        //     url: `${restApi}`,
        //     data: { data: values }
        // })
        //     .then(res => {
        //         cb();
        //         Toast({
        //             title: res.data,
        //             description: 'Todo Added',
        //             status: "success",
        //             duration: 5000,
        //             isClosable: true,
        //         })
        //     })
        //     .catch(err => {
        //         Toast({
        //             title: 'Error',
        //             description: err.message,
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //         })
        //     })
    }

    const doneTodo = (index, cb) => {
        //remove this cb below if you using the actual rest api
        cb()


        // Axios({
        //     method: 'post',
        //     url: `${restApi}`,
        // })
        //     .then(res => {
        //         cb();
        //     })
        //     .catch(err => {
        //         Toast({
        //             title: 'Error',
        //             description: err.message,
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //         })
        //     })
    }

    const deleteTodo = (toDoName, cb) => {
        //remove this cb below if you using the actual rest api
        cb()


        // Axios.delete(`${restApi}`)
        //     .then(res => {
        //         cb();
        //     })
        //     .catch(err => {
        //         Toast({
        //             title: 'Error',
        //             description: err.message,
        //             status: "error",
        //             duration: 5000,
        //             isClosable: true,
        //         })
        //     })
    }

    return (
        <Box height='100vh' width='100%'>
            <SideBarLeft adminData={adminData} />
            {children}
            <TodoBar sentTodo={sentTodo} doneTodo={doneTodo} deleteTodo={deleteTodo} />
        </Box>
    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi,
        adminData: state.adminData
    }
}

const dispatchToStore = dispatch => {
    return {
        dataSet: (dataSystems, dataWorks) => dispatch({ type: 'dataSet', dataSystems, dataWorks })
    }
}

export default connect(storeToProps, dispatchToStore)(ContainerCMS);
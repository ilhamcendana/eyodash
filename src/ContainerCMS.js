import React, { useEffect } from 'react';
import SideBarLeft from './components/SideBarLeft';
import { Box, useToast } from '@chakra-ui/core';
import TodoBar from './components/TodoBar';
import Axios from 'axios';
import { connect } from 'react-redux';



const ContainerCMS = ({ children, restApi, dataSet }) => {
    const Toast = useToast();
    useEffect(() => {
        FetchCmsData();
    }, [])

    const FetchCmsData = () => {
        Axios.get(`${restApi}/cms/all-data`)
            .then(res => {
                dataSet(res.data.Systems, res.data.Works);
            })
            .catch(err => {
                Toast({
                    title: 'Error',
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    const sentTodo = (values, cb) => {
        Axios({
            method: 'post',
            url: `${restApi}/post/systems/TodoList`,
            data: { data: values }
        })
            .then(res => {
                cb();
                Toast({
                    title: res.data,
                    description: 'Todo Added',
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                Toast({
                    title: 'Error',
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    const doneTodo = (index, cb) => {
        Axios({
            method: 'post',
            url: `${restApi}/Systems/Todo/${index}`,
        })
            .then(res => {
                cb();
            })
            .catch(err => {
                Toast({
                    title: 'Error',
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    const deleteTodo = (toDoName, cb) => {
        Axios.delete(`${restApi}/delete/Systems/Todo/${toDoName}`)
            .then(res => {
                cb();
            })
            .catch(err => {
                Toast({
                    title: 'Error',
                    description: err.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    return (
        <Box height='100vh' width='100%'>
            <SideBarLeft />
            {children}
            <TodoBar sentTodo={sentTodo} doneTodo={doneTodo} deleteTodo={deleteTodo} />
        </Box>
    );
}

const storeToProps = state => {
    return {
        restApi: state.restApi
    }
}

const dispatchToStore = dispatch => {
    return {
        dataSet: (dataSystems, dataWorks) => dispatch({ type: 'dataSet', dataSystems, dataWorks })
    }
}

export default connect(storeToProps, dispatchToStore)(ContainerCMS);
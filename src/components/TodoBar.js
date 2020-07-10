import React, { useState, useRef } from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/core';
import { BsTrashFill, BsCheck } from 'react-icons/bs';
import { connect } from 'react-redux';

const TodoBar = ({ TodoListIndicator, TodoList, modifyTodo, sentTodo, doneTodo, deleteTodo }) => {
    const date = new Date();
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

    const [inputTodo, inputTodoSet] = useState({ values: 'first', show: false })
    const inputRef = useRef(null);
    const [deletedItem, deletedItemSet] = useState('');


    return (
        <Box px='20px' py='40px' width={['250px', '250px', '230px', '350px']} height='100vh' boxShadow='1px 0px 5px rgba(0,0,0,.1)' position='fixed' right='0px'>
            <Box>
                <Text fontFamily='muli' fontWeight='900' fontSize='1.5rem'>{day[date.getDay()]}, <span style={{ fontWeight: '100' }}>{date.getDate()} {months[date.getMonth()]}</span></Text>
            </Box>

            {/* indicator task */}
            <Flex mt='50px' alignItems='center' justifyContent='space-between'>
                <Box>
                    <Text fontFamily='muli' fontWeight='bold' fontSize='sm' color='#000'>{TodoListIndicator.created}</Text>
                    <Text fontFamily='muli' fontWeight='bold' fontSize='sm' color='#ccc'>Created Task</Text>
                </Box>

                <Flex justifyContent='center' alignItems='flex-end' flexDirection='column'>
                    <Text fontFamily='muli' fontWeight='bold' fontSize='sm' color='#000'>{TodoListIndicator.completed}</Text>
                    <Text fontFamily='muli' fontWeight='bold' fontSize='sm' color='#ccc'>Completed Task</Text>
                </Flex>
            </Flex>

            {/* add button */}
            <Flex mt='50px' alignItems='center' justifyContent='center' flexDirection='column' position='relative'>
                <Button
                    onClick={() => {
                        inputTodoSet(prev => { return { values: '', show: !prev.show } });
                        if (inputTodo.show) {
                            inputRef.current.blur()
                        } else {
                            setTimeout(() => inputRef.current.focus(), 1000);
                        }
                    }} zIndex='10'
                    cursor='pointer' _hover={{ transform: 'scale(.95)' }} _active={{ transform: 'scale(.98)' }} _focus={{ outline: 'none' }}
                    alignItems='center' justifyContent='center' width='80px' height='80px' borderRadius='50%' bg={!inputTodo.show ? 'myGreen' : 'myRed'}>

                    <Box transform={`rotate(${inputTodo.show ? '45' : '0'}deg)`} transition='.3s' borderRadius='20px' width='40px' height='8px' bg='#fff' position='absolute' />
                    <Box transform={`rotate(${inputTodo.show ? '45' : '0'}deg)`} transition='.3s' borderRadius='20px' width='8px' height='40px' bg='#fff' position='absolute' />

                </Button>

                {/* input new todo */}
                <input
                    ref={inputRef}
                    value={inputTodo.values}
                    onChange={e => {
                        const val = e.target.value
                        inputTodoSet(prev => {
                            return {
                                show: prev.show,
                                values: val
                            }
                        })
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') sentTodo(inputTodo.values, () => {
                            inputRef.current.blur()
                            modifyTodo(inputTodo.values, 'add');
                            inputTodoSet(prev => { return { values: '', show: !prev.show } });
                        });
                    }}
                    type="text" className={`${(!inputTodo.show && inputTodo.values === 'first' ? '' : inputTodo.show ? 'animationOpenInput' : 'animationCloseInput')} apatuman`} />


                {/* list todos */}
                <Box width='100%' mt='70px'>
                    {TodoList.TodoList.map((item, index) => (
                        <Flex key={index} justifyContent='space-between' transition='.3s' alignItems='center' width='100%' mb='2' animation={item.toDo !== deletedItem ? `fadeIn .3s ${index / 5}s forwards` : `fadeOut .3s`} opacity='0'>
                            <Flex onClick={() => doneTodo(index, () => modifyTodo(index, 'done'))}
                                alignItems='center' cursor='pointer' width='100%' className='hoverTodoItems' transition='.3s'>
                                <Box padding='2px'
                                    display='flex' justifyContent='center' alignItems='center'
                                    mr='2' width='20px' height='20px' borderRadius='50%' border={`2px solid ${item.status ? '#62E59F' : '#333'}`}>

                                    {item.status ? <BsCheck color='#62E59F' /> : null}

                                </Box>
                                <Text fontFamily='muli' fontWeight='bold' fontSize='sm' color={`${item.status ? '#ccc' : '000'} `}>{item.toDo}</Text>
                            </Flex>

                            <Button
                                onClick={() => deleteTodo(item.toDo, () => {
                                    deletedItemSet(item.toDo);
                                    setTimeout(() => modifyTodo(item.toDo, 'remove'), 300);
                                })}
                                variant='ghost' _hover={{ color: 'myRed' }} _active={{ background: 'none', transform: 'scale(.90)' }} _focus={{ outline: 'none' }}>
                                <BsTrashFill />
                            </Button>
                        </Flex>
                    ))}
                </Box>
            </Flex>
        </Box>
    );
}

const storeToProps = state => {
    return {
        TodoList: state.Systems.TodoList,
        TodoListIndicator: state.Systems.TodoListIndicator
    }
}

const dispatchToStore = dispatch => {
    return {
        modifyTodo: (data, wyw) => dispatch({ type: 'modifyTodo', data, wyw })
    }
}

export default connect(storeToProps, dispatchToStore)(TodoBar);
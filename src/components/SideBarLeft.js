import React, { useState } from 'react';
import { Box, Text, Flex, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, ButtonGroup, PopoverFooter, Image } from '@chakra-ui/core';
import { GiBinoculars, GiStack, GiHelp } from 'react-icons/gi';
import { BsGearFill, BsDot } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io'
import { NavLink } from 'react-router-dom';

const SideBarLeft = ({ adminData }) => {
    const [openItems, openItemsSet] = useState({ which: '', expand: false });

    const navItems = [
        {
            label: 'Overview',
            nav: '/',
            iconLeft: <GiBinoculars style={{ color: '#ccc' }} />,
        },
        {
            label: 'Manage',
            child: [
                {
                    label: 'Works',
                    nav: '/Works'
                },
            ],
            iconLeft: <GiStack style={{ transition: '.3s', color: openItems.which === 'Manage' && openItems.expand ? '#000' : '#ccc' }} />,
        },
        {
            label: 'Settings',
            child: [
                {
                    label: 'Change Password',
                    nav: '/change-password'
                },
                {
                    label: 'Logout',
                    nav: '/logout'
                }
            ],
            nav: '/settings',
            iconLeft: <BsGearFill style={{ transition: '.3s', color: openItems.which === 'Settings' && openItems.expand ? '#000' : '#ccc' }} />,
        },
        {
            label: 'Help',
            child: [
                {
                    label: 'Problem',
                    nav: '/problem'
                },
                {
                    label: 'Contact Developer',
                    nav: '/contact'
                }
            ],
            nav: '/help',
            iconLeft: <GiHelp style={{ transition: '.3s', color: openItems.which === 'Help' && openItems.expand ? '#000' : '#ccc' }} />,
        }
    ]
    return (
        <Box padding='20px' width={['250px', '250px', '200px', '250px']} height='100vh' boxShadow='1px 0px 5px rgba(0,0,0,.1)' position='fixed'>
            {/* logo brand */}
            <Box>
                <Text fontFamily='muli' fontWeight='900' fontSize={['sm', 'sm', 'lg', '2rem']}>Eyodash</Text>
                <Text fontFamily='muli' fontWeight='bold' fontSize={['sm', 'sm', '8px', '10px']} color='#ccc'>Powered by Cendana</Text>
            </Box>

            {/* Nav Items */}
            <Box mt='50px'>
                {navItems.map(item => (
                    item.label === 'Overview' ?
                        <NavLink exact key={item.label}
                            to={item.nav}
                            activeClassName='activeNav'
                        >
                            <Flex key={item.label} width='100%' flexDirection='column' onClick={() => openItemsSet({ which: '', expand: false })}
                                mb='20px'>
                                <Flex width='100%'
                                    alignItems='center' justifyContent='space-between'>
                                    <Flex alignItems='center'>
                                        {item.iconLeft}
                                        <Text color={'#ccc'} transition='.3s'
                                            ml='2' fontFamily='muli' fontSize={['sm', 'sm', 'xs', 'sm']} fontWeight='bold'>{item.label}</Text>
                                    </Flex>

                                    <BsDot transition='.3s' style={{ color: window.location.pathname === item.label ? '#000' : '#ccc' }} />
                                </Flex>
                            </Flex>
                        </NavLink>

                        :

                        <Flex key={item.label} width='100%' flexDirection='column' cursor='pointer'
                            mb='20px'>
                            <Flex width='100%'
                                onClick={() => openItemsSet(prev => {
                                    return {
                                        which: item.label,
                                        expand: prev.which === item.label ? !prev.expand : true
                                    }
                                })}
                                alignItems='center' justifyContent='space-between'>
                                <Flex alignItems='center'>
                                    {item.iconLeft}
                                    <Text color={item.label !== 'Overview' ? openItems.which === item.label && openItems.expand ? '#000' : '#ccc' : '#ccc'} transition='.3s'
                                        ml='2' fontFamily='muli' fontSize={['sm', 'sm', 'xs', 'sm']} fontWeight='bold'>{item.label}</Text>
                                </Flex>

                                {item.label !== 'Overview' ?
                                    <IoIosArrowForward style={{ transform: `rotate(${openItems.which === item.label && openItems.expand ? '90' : '0'}deg)`, transition: '.3s', color: openItems.which === item.label && openItems.expand ? '#000' : '#ccc' }} />
                                    : null}
                            </Flex>

                            <Box height={openItems.which === item.label && openItems.expand ? `${30 * item.child.length}px` : '0px'}
                                pl='24px' transition='.3s' overflow='hidden'>
                                {item.child.map(child => (
                                    child.label !== 'Logout' ?
                                        <NavLink key={child.label}
                                            exact activeClassName='activeNav'
                                            style={{ display: 'block' }} to={child.nav}>
                                            <Text fontFamily='muli' color='#ccc' fontSize={['sm', 'sm', '10px', '12px']} mt='10px' fontWeight='bold'>{child.label}</Text>
                                        </NavLink>
                                        :
                                        <Popover key={child.label}>
                                            <PopoverTrigger>
                                                <Text fontFamily='muli' color='#ccc' fontSize={['sm', 'sm', '10px', '12px']} mt='10px' fontWeight='bold'>Logout</Text>
                                            </PopoverTrigger>
                                            <PopoverContent zIndex={4} bg='#333' borderColor='#333'>
                                                <PopoverArrow />
                                                <PopoverHeader color='#fff'>Logout</PopoverHeader>
                                                <PopoverBody color='#fff'>Are you sure you want to logout from Eyodash?</PopoverBody>
                                                <PopoverFooter
                                                    border="0"
                                                    d="flex"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    pb={4}
                                                >
                                                    <ButtonGroup size="sm">
                                                        <Button bg='#fff' color='#333'>No</Button>
                                                        <Button variantColor="#333" border='1px solid #fff'>
                                                            Yes
                                                            </Button>
                                                    </ButtonGroup>
                                                </PopoverFooter>
                                            </PopoverContent>
                                        </Popover>
                                ))}
                            </Box>
                        </Flex>
                ))}
            </Box>

            {/* profile */}
            <Flex position='absolute' bottom='50px' width='100%' alignItems='center' >
                <Image width={['40px', '40px', '40px', '50px']} height={['40px', '40px', '40px', '50px']} borderRadius='50%' mr={['0', '0', '2', '4']} src='https://placeimg.com/640/480/people' />
                <Box>
                    <Text fontFamily='muli' fontWeight='900' color='#000' lineHeight='19px' fontSize={['1rem', '1rem', '1rem', '1.5rem']}>{adminData.displayName}</Text>
                    <Text fontFamily='muli' fontWeight='100' color='#ccc' fontSize={['xs', 'xs', 'xs', 'sm']} >{adminData.role}</Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default SideBarLeft;

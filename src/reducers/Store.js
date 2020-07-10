const initialState = {
    restApi: process.env.NODE_ENV === 'development' ? '' : '',
    adminData: {
        displayName: 'Cendana',
        role: 'super admin',
        uid: '',
        photoUrl: '',
        email: ''
    },
    Systems: {
        TodoList: { TodoList: [] },
        aboutText: {
            aboutText: ""
        },
        iSpeak: {
            iSpeak: []
        },
        landingPageBigImage: {
            landingPageBigImage: ""
        },
        TodoListIndicator: {
            created: 0,
            completed: 0
        }
    },
    Works: []
}

const Store = (state = initialState, action) => {
    switch (action.type) {
        case 'dataSet':
            const { dataSystems, dataWorks } = action;

            return {
                ...state,
                Systems: dataSystems,
                Works: dataWorks
            }

        case 'modifyTodo':
            let sampled = [...state.Systems.TodoList.TodoList]
            let sampledIndicatorsCreated = state.Systems.TodoListIndicator.created;
            let sampledIndicatorsCompleted = state.Systems.TodoListIndicator.completed;

            if (action.wyw === 'add') {
                sampled.push({ toDo: action.data, status: false });
                sampledIndicatorsCreated += 1
            } else if (action.wyw === 'remove') {
                const removedSample = sampled.filter(item => item.toDo !== action.data);
                sampled = removedSample;
                sampledIndicatorsCreated -= 1;
                sampledIndicatorsCompleted -= 1;
            } else if (action.wyw === 'done') {
                sampled[action.data].status = !state.Systems.TodoList.TodoList[action.data].status;
                if (!state.Systems.TodoList.TodoList[action.data].status) {
                    sampledIndicatorsCompleted -= 1
                } else sampledIndicatorsCompleted += 1
            }
            return {
                ...state,
                Systems: {
                    ...state.Systems,
                    TodoList: { TodoList: sampled },
                    TodoListIndicator: {
                        created: sampledIndicatorsCreated,
                        completed: sampledIndicatorsCompleted
                    }
                }
            }

        default:
            break;
    }
    return state;
}

export default Store;
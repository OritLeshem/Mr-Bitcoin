import { userService } from "../services/user.service.js"

export const userStore = {
    state: {

        user: userService.getLoggedinUser(),
        users: []
    },
    getters: {
        loggedInUser({ user }) {
            return user
        }
    },
    mutations: {
        setUsers(state, { users }) {
            // console.log('payload: ', payload)
            state.users = users
        },
        setLoggedinUser(state, { user }) {
            console.log('payload: ', user)
            state.user = user
        },
        signup(state, { user }) {
            state.users.push(user)
        },
        updateUser(state, { user }) {
            const idx = state.users.findIndex(u => u._id === user._id)
            state.users.splice(idx, 1, user)
        },
    },
    actions: {
        async loadUsers({ commit }) {
            try {
                const users = await userService.query()
                commit({ type: 'setUsers', users })
            } catch (err) {
                throw err
            }
        },
        async saveUser({ commit }, { user }) {
            console.log('save user store ', user.balance)
            const actionType = (user._id) ? 'updateUser' : 'signup'
            try {
                const savedUser = await userService.save(user)
                commit({ type: actionType, contact: savedUser })
                return savedUser
            } catch (err) {

                throw err
            }
        },
        async saveTransfer({ commit }, { transfer }) {
            console.log('save user store ', transfer)
            // const actionType = (user._id) ? 'updateUser' : 'signup'
            try {
                // const savedUser = await userService.save(user)
                const user = await userService.transferFunds(transfer)
                console.log('user', user)
                // user = user
                commit({ type: 'setLoggedinUser', user })
                // commit({ type: actionType, contact: savedUser })
                // return savedUser
            } catch (err) {

                throw err
            }
        },
        async logoutUser({ commit }, { user }) {
            try {
                const savedUser = await userService.logout(user)
                console.log("store logout")
                commit({ type: 'setLoggedinUser', user })
            } catch (err) {
                throw err
            }
        }

    }
}
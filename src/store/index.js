import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        key: '1ac00fede8ff179b0d96329166f66c49',
        locationIsAllowed: true,
        bookmarkStarFull: true,
        userPosition: '',
        userLocation: '',
        allInfo: '',
        locationName: '',
        bookmarks: [],
        bookmarkAccent: '',
        loadedTime: '',
        overlay: {
            daily: false,
            dailyIndex: '',
            hourly: false,
            hourlyIndex: ''
        }
    },
    mutations: {

        locationNotAllowed(state){
            state.locationIsAllowed = false
        },
        setPosition(state, position){
            state.userPosition = position
        },
        setLocation(state, location){
            state.userLocation = location
        },
        setAllInfo(state, allInfo){
            state.allInfo = allInfo
        },
        setLocationName(state, locationName){
            state.locationName = locationName
        },
        setModal(state, modal){
            state.modal = modal
        },
        closeModal(state){
            state.modal = ''
        },
        ADD_BOOKMARK(state, addedBookmark){
            state.bookmarks.unshift({id: `${Date.now()}`, name: addedBookmark.name, country: addedBookmark.country, lat: addedBookmark.lat, lon: addedBookmark.lon})
            state.bookmarkAccent = state.bookmarks[0].id
        },
        SET_FOR_BOOKMARK({state, dispatch}, bookmarkInfo){
            this.state.userPosition = bookmarkInfo.coordinates
            this.state.locationName = bookmarkInfo.naming
            //this.BOOKMARK_STAR_FULL(true)
            this.dispatch('SEARCH_FINAL')

        },
        SET_BOOKMARKS(state, bookmarks){
            state.bookmarks = bookmarks
        },
        REMOVE_BOOKMARK(state, id){
            state.bookmarks.forEach((index)=>{
                if (index.id === id){
                    state.bookmarks = state.bookmarks.filter(item => item.id !== id)
                }
            })
            const jsonObg = JSON.stringify(state.bookmarks)
            localStorage.setItem('bookmarks', jsonObg)
        },
        SET_LOADEDTIME(state, time){
            state.loadedTime = time
        },
        ACTIVATE_OVERLAY(state, type){
            if (type === 'Hourly'){
                state.overlay.hourly = true
            } else if (type === 'Daily'){
                state.overlay.daily = true
            }
        },
        DEACTIVATE_OVERLAY(state, type){
            if (type === 'Hourly'){
                state.overlay.hourly = false
                state.overlay.hourlyIndex = ''
            } else if (type === 'Daily'){
                state.overlay.daily = false
                state.overlay.dailyIndex = ''
            }
            else{
                state.overlay.hourly = false
                state.overlay.daily = false
            }
        },
        SET_OVERLAY_KEY(state, output){
            if (output.type === 'Daily'){
                state.overlay.dailyIndex = output.index
                state.overlay.daily = true

            }else if(output.type === 'Hourly'){
                state.overlay.hourlyIndex = output.index
                state.overlay.hourly = true
            }
        },
        CLOSE_MODALS(state){
            state.overlay.daily = false
            state.overlay.dailyIndex = ''
            state.overlay.hourly = false
            state.overlay.hourlyIndex = ''
        },
        SET_BOOKMARK_ACCENT(state, id){
            state.bookmarkAccent = id
        },
        BOOKMARK_STAR_FULL(state, value){
            if(value === true){
                state.bookmarkStarFull = true
                return
            }
            state.bookmarkStarFull = false
        }
    },
    actions: {
        FOR_BOOKMARK({state, commit}){
            for (let i = 0; state.bookmarks.length > i ; i++){
                if (state.locationName.country === state.bookmarks[i].country && state.locationName.name === state.bookmarks[i].name){
                    commit('SET_BOOKMARK_ACCENT', state.bookmarks[i].id)
                    commit('BOOKMARK_STAR_FULL', true)
                }
            }
        },
        async GET_LOCATION({state, dispatch, commit}, cityName){
            try {

                const geocity = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${state.key}`)
                const geocityjson = await geocity.json()
                const locationName = {name: geocityjson[0].name, country: geocityjson[0].country}
                commit('setLocationName', locationName)
                const cityPosition = {lat: geocityjson[0].lat, lon: geocityjson[0].lon}
                commit('setPosition', cityPosition)
                dispatch('SEARCH_FINAL')
                commit('BOOKMARK_STAR_FULL', false)
            }catch (e){
                alert('City name was wrong. Please, check it & try more')
            }
        },
        async SEARCH_FINAL({state, commit, dispatch}){
            try {
                commit('SET_BOOKMARK_ACCENT', '')
                const weatherquery = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${state.userPosition.lat}&lon=${state.userPosition.lon}&exclude=alerts,current,minutely&appid=${state.key}&units=metric`)
                const weatherqueryjson = await weatherquery.json()
                commit('setAllInfo', weatherqueryjson)
                commit('SET_LOADEDTIME', Date.now())
                commit('CLOSE_MODALS')
                dispatch('FOR_BOOKMARK')

            }catch (e){
                alert('Something going wrong...')
            }
        }
    },
    getters: {
        KEY(state){
            return state.key
        },
        USER_POSITION(state){
            return state.userPosition
        },
        USER_LOCATION(state){
            return state.userLocation
        },
        LOCATION_NAME(state){
            return state.locationName
        },
        ALL_INFO(state){
            return state.allInfo
        },
        LOCATION_IS_ALLOWED(state){
            return state.locationIsAllowed
        },
        GET_BOOKMARKS(state){
            return state.bookmarks
        },
        GET_LOADEDTIME(state){
            return state.loadedTime
        },
        GET_OVERLAY_DAILY(state){
            return state.allInfo.daily[state.overlay.dailyIndex]
        },
        GET_OVERLAY_HOURLY(state){
            return state.allInfo.hourly[state.overlay.hourlyIndex]
        },
        GET_OVERLAY_TYPE_DAILY(state){
            return state.overlay.daily
        },
        GET_OVERLAY_TYPE_HOURLY(state){
            return state.overlay.hourly
        },
        GET_BOOKMARK_ACCENT(state){
            return state.bookmarkAccent
        },
        GET_BOOKMARK_STAR_FULL(state){
            return state.bookmarkStarFull
        }
    }


})

export default store
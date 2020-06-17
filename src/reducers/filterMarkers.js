import * as actions from "../actions";
import { isMobile } from 'react-device-detect'
import _ from "lodash"

const initialState = {
  mapCenter: {
    lat: parseFloat("39.952744"),
    lng: parseFloat("-75.163500")
  },
  showingInfoWindow: false ,
  infoIsExpanded: false,
  infoWindowClass: isMobile
    ? 'info-window-out'
    : 'info-window-out-desktop',
  isSearchShown: false,
  tapFilters: {
    filtered: false,
    handicap: false,
    sparkling: false,
    openNow: false,
    accessTypesHidden: []
  },
  foodFilters: {
    idRequired: false,
    kidOnly: false,
    openNow: false,
    accessTypesHidden: []
  },
  allTaps: [],
  nearbyTaps: {},
  allFoodOrgs: [],
  selectedPlace: {},
  phlaskType: actions.PHLASK_TYPE_WATER
};

export default (state = initialState, act) => {
  switch (act.type) {
    case actions.SET_TOGGLE_STATE:
      return {
        ...state,
        tapFilters: {
          ...state.tapFilters,
          filtered: act.toggle === "filtered" ? act.toggleState : state.tapFilters.filtered,
          handicap: act.toggle === "handicap" ? act.toggleState : state.tapFilters.handicap,
          sparkling: act.toggle === "sparkling" ? act.toggleState : state.tapFilters.sparkling,
          openNow: act.toggle === "openNow" ? act.toggleState : state.tapFilters.openNow
        }
      }
      
      case actions.SET_TOGGLE_STATE_FOOD:
        return {
          ...state,
          foodFilters: {
            ...state.foodFilters,
            idRequired: act.toggle === "idRequired" ? act.toggleState : state.foodFilters.idRequired,
            kidOnly: act.toggle === "kidOnly" ? act.toggleState : state.foodFilters.kidOnly,
            openNow: act.toggle === "openNow" ? act.toggleState : state.foodFilters.openNow            
          }
        }

    case actions.SET_MAP_CENTER:
      console.log(`Lat: ${act.coords.lat} -- Lon: ${act.coords.lng}`);
      
      return { ...state, mapCenter: act.coords}

    case actions.GET_TAPS_SUCCESS:
      return { ...state, allTaps: act.allTaps, filteredTaps: act.allTaps };

    case actions.GET_FOOD_SUCCESS:
      return { ...state, allFoodOrgs: act.allFoodOrgs, filteredOrgs: act.allFoodOrgs };

    case actions.SET_FILTER_FUNCTION:
      console.log("set filter func");
      return { filterFunction: !state.filterFunction, ...state };

    case actions.TOGGLE_SEARCH_BAR:
      // console.log('Seach Bar Shown: ' + act.isShown);
      return { ...state, isSearchShown: act.isShown }

    case actions.SET_SELECTED_PLACE:
      // console.log('Selected Place: ' + act.selectedPlace.organization);
      return { ...state, selectedPlace: act.selectedPlace}
    
    case actions.REMOVE_NEARBY_TAP:
      var new_remove_nearbyTaps = _.cloneDeep({...state.nearbyTaps});
      // delete new_remove_nearbyTaps[act.id];
      return {...state, nearbyTaps: new_remove_nearbyTaps};
    
    case actions.ADD_NEARBY_TAP:
      var new_add_nearbyTaps = _.cloneDeep({...state.nearbyTaps});
      new_add_nearbyTaps[act.id] = act.tap;
      return {...state, nearbyTaps: new_add_nearbyTaps};


    case actions.TOGGLE_INFO_WINDOW:
      // console.log('Info Window Class: ' + state.infoWindowClass);
      
      return act.isShown 
        ? {...state, 
            showingInfoWindow: act.isShown, 
            infoWindowClass: isMobile
              ? 'info-window-in'
              : 'info-window-in-desktop'
          }
        :{...state, showingInfoWindow: act.isShown}

    case actions.TOGGLE_INFO_WINDOW_CLASS:
      console.log('Info Window Class: ' + state.infoWindowClass);
      console.log('Is Mobile: ' + isMobile);
      
      return {...state, 
        infoWindowClass: isMobile
          ? act.isShown
            ? 'info-window-in'
            : 'info-window-out'
          : act.isShown
            ? 'info-window-in-desktop'
            : 'info-window-out-desktop'
      }

    case actions.TOGGLE_INFO_EXPANDED:
      return { ...state, infoIsExpanded: act.isExpanded };
    
    case actions.RESET_FILTER_FUNCTION:
      return {
        ...state,
        tapFilters: {
          accessTypesHidden: [],
          filtered: false,
          handicap: false,
          sparkling: false,
          openNow: false
        },
        foodFilters: {
          foodSite: false,
          school: false,
          charter: false,
          pha: false,
          idRequired: false,
          kidOnly: false,
          openNow: false,
          accessTypesHidden: []
        }
      }
    
    case actions.SET_FILTERED_TAP_TYPES:
      {
        let currentAccessTypesHidden = [...state.tapFilters.accessTypesHidden];
        if (currentAccessTypesHidden.includes(act.tapType)) {
          currentAccessTypesHidden = currentAccessTypesHidden.filter(tapType => tapType !== act.tapType)
        }
        else {
          currentAccessTypesHidden.push(act.tapType)
        }
        return {
          ...state,
          tapFilters: {
            ...state.tapFilters,
            accessTypesHidden: currentAccessTypesHidden
          }
        }
      }
    case actions.SET_FILTERED_FOOD_TYPES:
      {
        let currentAccessTypesHidden = [...state.foodFilters.accessTypesHidden];
        if (currentAccessTypesHidden.includes(act.foodType)) {
          currentAccessTypesHidden = currentAccessTypesHidden.filter(foodType => foodType !== act.foodType)
        }
        else {
          currentAccessTypesHidden.push(act.foodType)
        }
        return {
          ...state,
          foodFilters: {
            ...state.foodFilters,
            accessTypesHidden: currentAccessTypesHidden
          }
        }
    }

    case actions.TOGGLE_PHLASK_TYPE:
      console.log(act.mode);
      
      return {...state, phlaskType: act.mode}
    
    default:
      return state;
  }
};

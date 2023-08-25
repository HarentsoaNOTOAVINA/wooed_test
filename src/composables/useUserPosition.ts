import { onMounted, ref } from "vue";

function useUserPosition(){
    const userPosition = ref<{lat : number; lng : number;}>({lat : 0, lng : 0});
    const onSuccess = (position : any) =>{ 
        userPosition.value.lat = position.coords.latitude;
        userPosition.value.lng = position.coords.longitude;
    };
    const onError = (error :any) => {throw new Error(error);}

    onMounted( ()=>{
        navigator.geolocation.getCurrentPosition( onSuccess, onError );
    })
    return {userPosition} ; 
}

export default useUserPosition;


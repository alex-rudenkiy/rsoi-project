import useBackendApi from "./BackendApiHook";

const useUrlStore = () => {
    function getBackendUrl() {
        // return 'http://localhost:8099'
        return 'http://78.132.143.84:8099'
        //return `http://${process.env.REACT_APP_API_GATEWAY_IP}:${process.env.REACT_APP_API_GATEWAY_PORT}`;
    }
    return {getBackendUrl}
}

export default useUrlStore;
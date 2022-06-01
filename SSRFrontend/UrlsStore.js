import useFrontendApi from "./frontendApiHooks";

const useUrlStore = () => {
    function getBackendUrl() {
        // return 'http://localhost:8099'
        return 'http://rsoiproject.ddns.net:9199'
        //return `http://${process.env.REACT_APP_API_GATEWAY_IP}:${process.env.REACT_APP_API_GATEWAY_PORT}`;
    }
    return {getBackendUrl}
}

export default useUrlStore;
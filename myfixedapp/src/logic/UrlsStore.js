import useBackendApi from "./BackendApiHook";

const useUrlStore = () => {
    function getBackendUrl() {
        return `http://${process.env.API_GATEWAY_IP}:${process.env.API_GATEWAY_PORT}`;
    }
    return {getBackendUrl}
}

export default useUrlStore;
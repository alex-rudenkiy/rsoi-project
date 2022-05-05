import useBackendApi from "./BackendApiHook";

const useUrlStore = () => {
    function getBackendUrl() {
        return "http://localhost:8888";
    }
    return {getBackendUrl}
}

export default useUrlStore;

// Code for using the device location:

function handleDeviceLocationAccessError(error) {
    unlock_location_selection_functionalities();
    var checkbox = document.getElementById("place_use_system_location");
    checkbox.checked = false;
    var error_text = "";
    if (error.code == error.PERMISSION_DENIED)
        error_text = "Location access denied.";
    else if (error.code == error.POSITION_UNAVAILABLE)
        error_text = "Location information unavailable.";
    else if (error.code == error.TIMEOUT)
        error_text = "Location request timed out.";
    else if (error.code == error.UNKNOWN_ERROR)
        error_text = "Location request unsuccessful.";
    display_error_text("device_location_error_text", error_text);
}

function useDeviceLocation() {
    var checkbox = document.getElementById("place_use_system_location");
    _data.use_device_location = checkbox.checked;
    if (checkbox.checked && !checkbox.disabled) {
        if (!navigator.geolocation) {
            display_error_text("device_location_error_text", "Device location functionality unsupported by device.");
            checkbox.checked = false;
            _data.use_device_location = false;
        } else {
            _data.use_device_location = true;
            lock_location_selection_functionalities("place_use_system_location");
            navigator.geolocation.getCurrentPosition(setLocation, handleDeviceLocationAccessError);
        }
    }
}

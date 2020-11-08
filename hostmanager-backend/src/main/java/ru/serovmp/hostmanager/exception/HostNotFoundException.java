package ru.serovmp.hostmanager.exception;

public class HostNotFoundException extends HostManagerBaseException {
    public HostNotFoundException() {
    }

    public HostNotFoundException(String message) {
        super(message);
    }

    public HostNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public HostNotFoundException(Throwable cause) {
        super(cause);
    }
}

package ru.serovmp.hostmanager.exception;

public class HostManagerBaseException extends RuntimeException {
    public HostManagerBaseException() {
    }

    public HostManagerBaseException(String message) {
        super(message);
    }

    public HostManagerBaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public HostManagerBaseException(Throwable cause) {
        super(cause);
    }
}

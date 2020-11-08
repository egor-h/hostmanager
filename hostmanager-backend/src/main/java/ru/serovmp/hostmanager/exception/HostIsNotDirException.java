package ru.serovmp.hostmanager.exception;

public class HostIsNotDirException extends HostManagerBaseException {
    public HostIsNotDirException() {
    }

    public HostIsNotDirException(String message) {
        super(message);
    }

    public HostIsNotDirException(String message, Throwable cause) {
        super(message, cause);
    }

    public HostIsNotDirException(Throwable cause) {
        super(cause);
    }
}

package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.validation.HostAddressConstraint;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostForm {
    private String name;
    @HostAddressConstraint
    private String address;
    private int port;
    private boolean enabled;
    private boolean dir;
    private List<String> tags;
    private List<Long> protocols;
}

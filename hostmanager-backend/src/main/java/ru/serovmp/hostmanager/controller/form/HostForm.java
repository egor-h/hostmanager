package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.validation.HostAddressConstraint;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostForm {
    private String name;
    @HostAddressConstraint
    private String address;
    @Min(0) @Max(65536)
    private int port;
    private boolean enabled;
    private boolean dir;
    private List<String> tags;
    private List<Long> protocols;
}

package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HostForm {
    private String name;
    private String address;
    private boolean enabled;
    private boolean dir;
    private List<String> tags;
    private List<Long> protocols;
}

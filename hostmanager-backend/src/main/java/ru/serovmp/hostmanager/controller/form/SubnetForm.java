package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubnetForm {
    private String name;
    private String address;
    private String mask;
}

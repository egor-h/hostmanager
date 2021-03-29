package ru.serovmp.hostmanager.restentities.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZabbixGroupsRequest implements MethodNameable {
    String output;

    @Override
    public String methodName() {
        return "hostgroup.get";
    }
}

package ru.serovmp.hostmanager.restentities.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ZabbixHostsRequest implements MethodNameable {
    private List<String> groupids;
    private List<String> output;
    private List<String> selectInterfaces;

    @Override
    public String methodName() {
        return "host.get";
    }
}

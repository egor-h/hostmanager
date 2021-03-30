package ru.serovmp.hostmanager.restentities.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor @NoArgsConstructor @Data
public class ZabbixCreateHostRequest implements MethodNameable {
    private String host;
    private String name;
    private List<Interface> interfaces;
    private List<Group> groups;


    @Override
    public String methodName() {
        return "host.create";
    }

    @AllArgsConstructor @NoArgsConstructor @Data
    public static class Interface {
        int type;
        int main;
        int useip;
        String ip;
        String dns;
        String port;
    }

    @AllArgsConstructor @NoArgsConstructor @Data
    public static class Group {
        String groupid;
    }
}

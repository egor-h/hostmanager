package ru.serovmp.hostmanager.restentities.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor @NoArgsConstructor @Data
public class ZabbixHostsResponse extends ZabbixBaseResponse {
    private List<Result> result;

    @AllArgsConstructor @NoArgsConstructor @Data
    public class Result {
        private String hostId;
        private String host;
        private String name;
        private List<Interface> interfaces;
    }

    @AllArgsConstructor @NoArgsConstructor @Data
    public class Interface {
        private String interfaceid;
        private String ip;
    }

    @JsonProperty("result")
    public void setResult(List<Map<String, Object>> result) {
        this.result = result.stream().map(hostMap -> {
            var interfaces = ((List<Map<String, String>>) hostMap.get("interfaces"))
                    .stream()
                    .map(itf -> new Interface(itf.get("interfaceid"), itf.get("ip")))
                    .collect(Collectors.toList());

            return new Result((String) hostMap.get("hostid"),
                    (String) hostMap.get("hostid"),
                    (String) hostMap.get("hostid"),
                    interfaces);
        }).collect(Collectors.toList());
    }
}

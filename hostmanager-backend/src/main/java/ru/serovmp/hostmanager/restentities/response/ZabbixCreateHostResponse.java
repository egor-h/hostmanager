package ru.serovmp.hostmanager.restentities.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor @NoArgsConstructor @Data
public class ZabbixCreateHostResponse extends ZabbixBaseResponse {
    private List<String> hostIds;

    @JsonProperty("result")
    public void setResult(Map<String, List<String>> result) {
        hostIds = result.get("hostids");
    }

}

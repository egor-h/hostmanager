package ru.serovmp.hostmanager.restentities.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZabbixBaseResponse {
    String jsonrpc;
    long id;
}

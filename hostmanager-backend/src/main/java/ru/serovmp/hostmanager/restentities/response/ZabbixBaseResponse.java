package ru.serovmp.hostmanager.restentities.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZabbixBaseResponse<T> {
    String jsonRpc;
    T result;
    long id;
}

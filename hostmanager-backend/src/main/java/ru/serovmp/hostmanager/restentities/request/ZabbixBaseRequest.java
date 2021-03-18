package ru.serovmp.hostmanager.restentities.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZabbixBaseRequest<T> {
    String jsonrpc = "2.0";
    String method;
    T params;
    long id;
    String auth;

    public static <U> ZabbixBaseRequest<U> baseRequest(String method, long id, String auth, U params) {
        return new ZabbixBaseRequest<U>("2.0", method, params, id, auth);
    }
}

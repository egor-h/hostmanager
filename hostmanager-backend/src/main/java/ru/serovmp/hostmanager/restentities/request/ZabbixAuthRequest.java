package ru.serovmp.hostmanager.restentities.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ZabbixAuthRequest<T> {
    String user;
    String password;
}

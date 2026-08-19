package com.ecommerce.gateway.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain) {

        long startTime = System.currentTimeMillis();

        log.info("========================================");
        log.info("Incoming Request");
        log.info("Method : {}", exchange.getRequest().getMethod());
        log.info("URI    : {}", exchange.getRequest().getURI());
        log.info("========================================");

        return chain.filter(exchange)
                .then(Mono.fromRunnable(() -> {

                    long duration =
                            System.currentTimeMillis() - startTime;

                    log.info("========================================");
                    log.info("Outgoing Response");
                    log.info("Status : {}",
                            exchange.getResponse().getStatusCode());
                    log.info("Time   : {} ms", duration);
                    log.info("========================================");

                }));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}